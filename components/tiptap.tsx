'use client';

import { Toolbar } from '@/components/toolbar';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Tiptap = ({
  message,
  onChange,
}: {
  message: string;
  onChange: (richTExt: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Underline,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
          levels: [2],
        },
      }),
    ],
    content: message,
    editorProps: {
      attributes: {
        class: 'rounded-md border min-h-[150px] border-input bg-background',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex min-h-[250px] flex-col justify-stretch gap-y-4">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
