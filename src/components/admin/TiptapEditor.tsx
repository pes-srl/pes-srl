"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TiptapEditor({ content, onChange }: { content: string, onChange: (content: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'Inizia a scrivere il tuo articolo...',
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert prose-fuchsia max-w-none focus:outline-none min-h-[300px] p-4 text-white',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('URL:');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('URL Immagine:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-950 flex flex-col">
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-zinc-900">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-white/10 text-fuchsia-400' : 'text-zinc-400 hover:text-white'}
                >
                    <Bold className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-white/10 text-fuchsia-400' : 'text-zinc-400 hover:text-white'}
                >
                    <Italic className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'bg-white/10 text-fuchsia-400' : 'text-zinc-400 hover:text-white'}
                >
                    <Strikethrough className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-white/10 text-fuchsia-400' : 'text-zinc-400 hover:text-white'}
                >
                    <Heading2 className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-white/10 text-fuchsia-400' : 'text-zinc-400 hover:text-white'}
                >
                    <List className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-white/10 text-fuchsia-400' : 'text-zinc-400 hover:text-white'}
                >
                    <ListOrdered className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addLink}
                    className={editor.isActive('link') ? 'bg-white/10 text-fuchsia-400' : 'text-zinc-400 hover:text-white'}
                >
                    <LinkIcon className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                    className="text-zinc-400 hover:text-white"
                >
                    <ImageIcon className="w-4 h-4" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto cursor-text bg-zinc-950 hover:bg-zinc-900/50 transition-colors" onClick={() => editor.commands.focus()}>
                <EditorContent editor={editor} />
            </div>

            {/* Iniezione CSS globale per Tiptap */}
            <style jsx global>{`
                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #52525b; /* text-zinc-500 */
                    pointer-events: none;
                    height: 0;
                }
                .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .ProseMirror a {
                    color: #e879f9; /* fuchsia-400 */
                    text-decoration: underline;
                    cursor: pointer;
                }
                .ProseMirror h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                }
            `}</style>
        </div>
    );
}
