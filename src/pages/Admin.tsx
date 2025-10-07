import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"; // Using sonner for toasts
import { Trash2, Edit, Plus, Loader2, ArrowLeft, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types"; // Import Supabase types
import { useTranslation } from "@/contexts/TranslationContext"; // Import useTranslation

type BlogPost = Tables<'blog_posts'>; // Use Supabase type for blog posts

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const { t } = useTranslation(); // Use useTranslation hook

  // Check if already authenticated on component mount
  useEffect(() => {
    const auth = localStorage.getItem("admin_authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadPosts();
    }
  }, []);

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error(t("admin.errorLoadingPosts"), {
        description: t("admin.failedToLoadPosts"),
      });
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      await loadPosts();
      toast.success(t("admin.loginSuccess"), {
        description: t("admin.welcomeDashboard"),
      });
    } else {
      toast.error(t("admin.loginFailed"), {
        description: t("admin.invalidCredentials"),
      });
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setUsername("");
    setPassword("");
    setPosts([]);
    toast.info(t("admin.loggedOut"), {
      description: t("admin.loggedOutSuccessfully"),
    });
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const title = formData.get("title") as string;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title,
          excerpt: formData.get("excerpt") as string,
          content: formData.get("content") as string,
          category: formData.get("category") as string,
          slug,
          read_time: "5 min read",
          author: "Sports Chronicle Team",
          language: "en"
        })
        .select()
        .single();

      if (error) throw error;

      setPosts([data, ...posts]);
      (e.target as HTMLFormElement).reset();
      setActiveTab("posts"); // Switch back to posts list
      
      toast.success(t("admin.postCreated"), {
        description: t("admin.postCreatedSuccess"),
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(t("admin.errorCreatingPost"), {
        description: t("admin.failedToCreatePost"),
      });
    }
  };

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPost) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          title,
          excerpt: formData.get("excerpt") as string,
          content: formData.get("content") as string,
          category: formData.get("category") as string,
          slug,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingPost.id)
        .select()
        .single();

      if (error) throw error;

      setPosts(posts.map(post => post.id === editingPost.id ? data : post));
      setEditingPost(null);
      setActiveTab("posts"); // Switch back to posts list
      
      toast.success(t("admin.postUpdated"), {
        description: t("admin.postUpdatedSuccess"),
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(t("admin.errorUpdatingPost"), {
        description: t("admin.failedToUpdatePost"),
      });
    }
  };

  const startEditingPost = (post: BlogPost) => {
    setEditingPost(post);
    setActiveTab("create"); // Switch to the create/edit tab
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setPosts(posts.filter(post => post.id !== postId));
      toast.success(t("admin.postDeleted"), {
        description: t("admin.postDeletedSuccess"),
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(t("admin.errorDeletingPost"), {
        description: t("admin.failedToDeletePost"),
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-4 text-center">
            <Link to="/">
              <Button variant="ghost" className="btn-hover-lift">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("common.backToSite")}
              </Button>
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{t("admin.loginTitle")}</CardTitle>
              <CardDescription className="text-center">
                {t("admin.loginSubtitle")}
              </CardDescription>
            </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">{t("admin.username")}</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("admin.username")}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">{t("admin.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("admin.password")}
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? t("admin.loggingIn") : t("admin.loginButton")}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-muted rounded text-sm text-muted-foreground">
              <p><strong>{t("admin.demoCredentials")}</strong></p>
              <p>{t("admin.usernameDemo")}</p>
              <p>{t("admin.passwordDemo")}</p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold">{t("admin.dashboardTitle")}</h1>
            <p className="text-muted-foreground">{t("admin.dashboardSubtitle")}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline" className="btn-hover-lift">
                <Home className="h-4 w-4 mr-2" />
                {t("common.backToSite")}
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline">
              {t("admin.logout")}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="posts">{t("admin.managePosts")}</TabsTrigger>
            <TabsTrigger value="create">
              {editingPost ? t("admin.editPost") : t("admin.createPost")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.blogPosts")}</CardTitle>
                <CardDescription>
                  {t("admin.manageExistingPosts")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingPosts ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">{t("admin.loadingPosts")}</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{post.category}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(post.created_at).toLocaleDateString("en-US", { 
                                year: "numeric", 
                                month: "short", 
                                day: "numeric" 
                              })} • {post.read_time || "5 min read"}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditingPost(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingPost ? t("admin.editPost") : t("admin.createPost")}
                </CardTitle>
                <CardDescription>
                  {editingPost 
                    ? t("admin.updatePostDetails")
                    : t("admin.addNewPost")
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form 
                  onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="title">{t("admin.postTitle")}</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={editingPost?.title || ""}
                      placeholder={t("admin.enterPostTitle")}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">{t("admin.postCategory")}</Label>
                    <Input
                      id="category"
                      name="category"
                      defaultValue={editingPost?.category || ""}
                      placeholder={t("admin.enterCategory")}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">{t("admin.postExcerpt")}</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      defaultValue={editingPost?.excerpt || ""}
                      placeholder={t("admin.briefDescription")}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">{t("admin.postContent")}</Label>
                    <Textarea
                      id="content"
                      name="content"
                      defaultValue={editingPost?.content || ""}
                      placeholder={t("admin.writeContent")}
                      required
                      className="mt-1 min-h-[300px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      {editingPost ? t("admin.updatePost") : t("admin.createPost")}
                    </Button>
                    {editingPost && (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setEditingPost(null);
                          setActiveTab("posts");
                        }}
                      >
                        {t("common.cancel")}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;