import React, { Suspense, lazy } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField as FormFieldComponent, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormFieldProps } from './types';

// Lazy load ReactQuill
const ReactQuill = lazy(() => import('react-quill'));

// Fallback component for lazy loading
const EditorFallback = () => (
  <div className="h-32 bg-muted animate-pulse rounded-md flex items-center justify-center">
    <span className="text-muted-foreground">Loading editor...</span>
  </div>
);

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  className = '',
  rows = 3,
  component = 'input',
  editorRef,
  editorConfig,
}) => {
  const { control } = useFormContext();

  const renderInput = (field: any) => {
    switch (component) {
      case 'textarea':
        return (
          <Textarea
            {...field}
            placeholder={placeholder}
            className={`min-h-[100px] ${className}`}
            rows={rows}
          />
        );
      case 'editor':
        return (
          <div className="min-h-[300px] [&_.ql-toolbar]:sticky [&_.ql-toolbar]:top-0 [&_.ql-toolbar]:z-10 [&_.ql-toolbar]:bg-background [&_.ql-container]:min-h-[250px]">
            <Suspense fallback={<EditorFallback />}>
              <ReactQuill
                ref={editorRef}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
                modules={editorConfig?.modules}
                formats={editorConfig?.formats}
                className="h-full"
              />
            </Suspense>
          </div>
        );
      default:
        return (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className={className}
          />
        );
    }
  };

  return (
    <FormFieldComponent
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {renderInput(field)}
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
