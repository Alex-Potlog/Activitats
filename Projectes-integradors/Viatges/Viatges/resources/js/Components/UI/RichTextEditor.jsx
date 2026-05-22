import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useMemo, useState } from 'react';
import { Bold, Italic, Heading2, List, ListOrdered } from 'lucide-react';

function ToolbarButton({ onClick, label, disabled, icon: Icon, isActive }) {
    return (
        <button
            type="button"
            title={label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
            disabled={disabled}
            className={`rounded p-2 transition-colors ${
                isActive
                    ? 'bg-principal text-blanco-crema dark:bg-secundario dark:text-azul-medianoche'
                    : 'hover:bg-gris-arena/20 dark:hover:bg-gris-ceniza/20'
            } disabled:cursor-not-allowed disabled:opacity-50 dark:text-blanco-crema`}
        >
            <Icon size={18} />
        </button>
    );
}

export default function RichTextEditor({ value, onChange, error }) {
    const [buttonStates, setButtonStates] = useState({
        bold: false,
        italic: false,
        heading2: false,
        bulletList: false,
        orderedList: false,
    });

    const extensions = useMemo(
        () => [
            StarterKit.configure({
                blockquote: false,
                heading: {
                    levels: [1, 2, 3],
                },
                bulletList: {
                    keepMarks: true,
                },
                orderedList: {
                    keepMarks: true,
                },
            }),
        ],
        [],
    );

    const editor = useEditor({
        extensions,
        content: value || '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'rich-text-editor min-h-[220px] max-h-[360px] overflow-y-auto w-full bg-transparent px-3 py-2 text-sm text-azul-medianoche outline-none dark:text-blanco-crema',
            },
        },
        onUpdate: ({ editor: currentEditor }) => {
            onChange(currentEditor.isEmpty ? '' : currentEditor.getHTML());
            setButtonStates((prev) => ({
                ...prev,
                heading2: currentEditor.isActive('heading', { level: 2 }),
                bulletList: currentEditor.isActive('bulletList'),
                orderedList: currentEditor.isActive('orderedList'),
            }));
        },
        onSelectionUpdate: ({ editor: currentEditor }) => {
            setButtonStates((prev) => ({
                ...prev,
                heading2: currentEditor.isActive('heading', { level: 2 }),
                bulletList: currentEditor.isActive('bulletList'),
                orderedList: currentEditor.isActive('orderedList'),
            }));
        },
    });


    useEffect(() => {
        if (!editor) {
            return;
        }

        const currentHtml = editor.isEmpty ? '' : editor.getHTML();
        const nextHtml = value ?? '';

        if (nextHtml === currentHtml) {
            return;
        }

        if (nextHtml === '') {
            editor.commands.clearContent(true);
            return;
        }

        editor.commands.setContent(nextHtml, false);
    }, [editor, value]);

    const handleBold = () => {
        editor?.chain().focus().toggleBold().run();
        setButtonStates((prev) => ({ ...prev, bold: !prev.bold }));
    };

    const handleItalic = () => {
        editor?.chain().focus().toggleItalic().run();
        setButtonStates((prev) => ({ ...prev, italic: !prev.italic }));
    };

    const handleHeading = () => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
    };

    const handleBulletList = () => {
        editor?.chain().focus().toggleBulletList().run();
    };

    const handleOrderedList = () => {
        editor?.chain().focus().toggleOrderedList().run();
    };

    return (
        <div className="space-y-2">
            <div className="rounded border border-gris-arena/50 transition-colors dark:border-gris-ceniza/20">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 border-b border-gris-arena/50 bg-gris-arena/10 p-2 dark:border-gris-ceniza/20 dark:bg-azul-medianoche/5">
                    <ToolbarButton
                        label="Negreta"
                        icon={Bold}
                        disabled={!editor}
                        isActive={buttonStates.bold}
                        onClick={handleBold}
                    />
                    <ToolbarButton
                        label="Cursiva"
                        icon={Italic}
                        disabled={!editor}
                        isActive={buttonStates.italic}
                        onClick={handleItalic}
                    />
                    <ToolbarButton
                        label="Títol"
                        icon={Heading2}
                        disabled={!editor}
                        isActive={buttonStates.heading2}
                        onClick={handleHeading}
                    />
                    <ToolbarButton
                        label="Llista"
                        icon={List}
                        disabled={!editor}
                        isActive={buttonStates.bulletList}
                        onClick={handleBulletList}
                    />
                    <ToolbarButton
                        label="Llista numerada"
                        icon={ListOrdered}
                        disabled={!editor}
                        isActive={buttonStates.orderedList}
                        onClick={handleOrderedList}
                    />
                </div>

                {/* Editor */}
                <div className="p-2">
                    <EditorContent editor={editor} />
                </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
