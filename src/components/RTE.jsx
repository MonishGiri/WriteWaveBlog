import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "", maxLength = '500' }) {
  const [contentLength, setContentLength] = useState(defaultValue.length);

  const handleEditorChange = (content, editor, onChange) => {
    const currentLength = editor.getContent({ format: 'text' }).length;

    if (currentLength <= maxLength) {
      setContentLength(currentLength);
      onChange(content);
    }
  };

  return (
    <div className='w-full text-white'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey='wzj6z73cbhxq3tb41t2sascigq87ux2v01xrqn6gw65o2iw3'
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; ; }",
              setup: (editor) => {
                editor.on('keydown', (e) => {
                  const contentLength = editor.getContent({ format: 'text' }).length;

                  // If maxLength is reached, prevent further typing
                  if (contentLength >= maxLength && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                  }
                });
              }
            }}
            onEditorChange={(content, editor) => handleEditorChange(content, editor, onChange)}
          />
        )}
      />
      <p className='text-sm text-gray-400 mt-2'>
        {contentLength}/{maxLength} characters
      </p>
    </div>
  );
}
