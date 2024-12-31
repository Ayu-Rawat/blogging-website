import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={String(import.meta.env.VITE_TINYMCE_API)}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "wordcount",
                "textcolor", 
              ],
              toolbar:
                "undo redo | bold italic forecolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist | removeformat",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              font_formats: "Arial=arial,helvetica,sans-serif;Verdana=verdana,geneva;Times New Roman=times new roman,times;Courier New=courier new,courier;Comic Sans MS=comic sans ms,sans-serif;", // Custom font options
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
