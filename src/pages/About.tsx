import skiingImage from "@/assets/skiing-1.jpg";
import { useTranslation } from "@/contexts/TranslationContext";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            {t("about.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <div className="aspect-[21/9] overflow-hidden rounded-lg max-w-4xl mx-auto">
            <img
              src={skiingImage}
              alt="Skiing action shot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="space-y-6 text-foreground leading-relaxed">
            <p>
              {t("about.foundationText")}
            </p>

            <p>
              {t("about.teamText")}
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">
              {t("about.missionTitle")}
            </h2>
            <p>
              {t("about.missionText")}
            </p>

            {/* Team Section */}
            <div className="mt-16 mb-12">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold mb-4 scroll-reveal">
                  {t("about.teamTitle")}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto scroll-reveal">
                  {t("about.teamSubtitle")}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="group hover:shadow-lg transition-all duration-300 scroll-reveal">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {t("about.team.editor.name").charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">
                      {t("about.team.editor.name")}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-3">
                      {t("about.team.editor.title")}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t("about.team.editor.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 scroll-reveal">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {t("about.team.analyst.name").charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">
                      {t("about.team.analyst.name")}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-3">
                      {t("about.team.analyst.title")}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t("about.team.analyst.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 scroll-reveal">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {t("about.team.reporter.name").charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">
                      {t("about.team.reporter.name")}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-3">
                      {t("about.team.reporter.title")}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t("about.team.reporter.description")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 scroll-reveal">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-muted to-muted-foreground rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {t("about.team.photographer.name").charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">
                      {t("about.team.photographer.name")}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-3">
                      {t("about.team.photographer.title")}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t("about.team.photographer.description")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">
              {t("about.coverageTitle")}
            </h2>
            <ul className="space-y-2">
              <li><strong>{t("category.soccer")}</strong> - {t("about.footballCoverage")}</li>
              <li><strong>{t("category.basketball")}</strong> - {t("about.basketballCoverage")}</li>
              <li><strong>{t("category.baseball")}</strong> - {t("about.baseballCoverage")}</li>
              <li><strong>{t("category.tennis")}</strong> - {t("about.tennisCoverage")}</li>
              <li><strong>{t("about.olympicSports")}</strong> - {t("about.olympicCoverage")}</li>
              <li><strong>{t("about.emergingSportsTitle")}</strong> - {t("about.emergingSports")}</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">
              {t("about.valuesTitle")}
            </h2>
            <p>
              {t("about.valuesText")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;