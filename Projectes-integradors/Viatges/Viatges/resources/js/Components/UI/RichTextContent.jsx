import { EditorContent, useEditor } from '@tiptap/react';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useMemo } from 'react';

export default function RichTextContent({ content }) {
    const extensions = useMemo(
        () => [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['https', 'http', 'mailto'],
            }),
        ],
        [],
    );

    const editor = useEditor({
        extensions,
        content: content || '',
        editable: false,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'rich-text-content text-gray-700 dark:text-gray-300',
            },
        },
    });

    useEffect(() => {
        if (!editor) {
            return;
        }

        const currentHtml = editor.isEmpty ? '' : editor.getHTML();
        const nextHtml = content ?? '';

        if (currentHtml !== nextHtml) {
            editor.commands.setContent(nextHtml, false);
        }
    }, [editor, content]);

    if (!editor) {
        return null;
    }

    return <EditorContent editor={editor} />;
}
