export interface TagDefinition {
  id: string;
  label: string;
  emoji: string;
  color: string;
  category: "modality" | "license" | "platform" | "purpose";
}

export const TAG_LIBRARY: TagDefinition[] = [
  { id: "Chat", label: "Chat", emoji: "💬", color: "blue", category: "modality" },
  { id: "Image", label: "Image", emoji: "🎨", color: "pink", category: "modality" },
  { id: "Video", label: "Video", emoji: "🎬", color: "purple", category: "modality" },
  { id: "Coding", label: "Coding", emoji: "💻", color: "green", category: "purpose" },
  { id: "Research", label: "Research", emoji: "🔬", color: "indigo", category: "purpose" },
  { id: "Search", label: "Search", emoji: "🔍", color: "teal", category: "purpose" },
  { id: "Music", label: "Music", emoji: "🎵", color: "pink", category: "modality" },
  { id: "Voice", label: "Voice", emoji: "🎙️", color: "orange", category: "modality" },
  { id: "3D", label: "3D", emoji: "🧊", color: "blue", category: "modality" },
  { id: "Productivity", label: "Productivity", emoji: "⚡", color: "yellow", category: "purpose" },
  { id: "Multimodal", label: "Multimodal", emoji: "✨", color: "purple", category: "modality" },
  { id: "Agents", label: "Agents", emoji: "🤖", color: "indigo", category: "purpose" },
  { id: "Workflow", label: "Workflow", emoji: "🔄", color: "teal", category: "purpose" },
  { id: "API", label: "API", emoji: "🔌", color: "green", category: "platform" },
  { id: "Open Source", label: "Open Source", emoji: "🌐", color: "green", category: "license" },
  { id: "Free", label: "Free", emoji: "🆓", color: "green", category: "license" },
  { id: "Commercial", label: "Commercial", emoji: "💼", color: "orange", category: "license" },
  { id: "Local", label: "Local", emoji: "💾", color: "blue", category: "platform" },
  { id: "Cloud", label: "Cloud", emoji: "☁️", color: "blue", category: "platform" },
  { id: "Multilingual", label: "Multilingual", emoji: "🌍", color: "teal", category: "purpose" },
  { id: "Enterprise", label: "Enterprise", emoji: "🏢", color: "indigo", category: "purpose" },
  { id: "Long-context", label: "Long Context", emoji: "📜", color: "purple", category: "purpose" },
  { id: "Reasoning", label: "Reasoning", emoji: "🧠", color: "indigo", category: "purpose" },
  { id: "Real-time", label: "Real-time", emoji: "⚡", color: "yellow", category: "purpose" },
  { id: "Typography", label: "Typography", emoji: "🔤", color: "pink", category: "purpose" },
  { id: "Design", label: "Design", emoji: "🎨", color: "pink", category: "purpose" },
  { id: "Vector", label: "Vector", emoji: "📐", color: "blue", category: "modality" },
  { id: "Avatar", label: "Avatar", emoji: "🧑", color: "orange", category: "modality" },
  { id: "Audio", label: "Audio", emoji: "🔊", color: "orange", category: "modality" },
  { id: "Writing", label: "Writing", emoji: "✍️", color: "yellow", category: "purpose" },
  { id: "Knowledge", label: "Knowledge", emoji: "📚", color: "indigo", category: "purpose" },
  { id: "Transcription", label: "Transcription", emoji: "📝", color: "teal", category: "purpose" },
  { id: "Presentation", label: "Presentation", emoji: "📊", color: "blue", category: "purpose" },
  { id: "Vision", label: "Vision", emoji: "👁️", color: "pink", category: "modality" },
  { id: "Sandboxes", label: "Sandboxes", emoji: "🛡️", color: "green", category: "platform" },
  { id: "CLI", label: "CLI", emoji: "⌨️", color: "blue", category: "platform" },
  { id: "Desktop app", label: "Desktop", emoji: "🖥️", color: "blue", category: "platform" },
  { id: "Web", label: "Web", emoji: "🌐", color: "blue", category: "platform" },
  { id: "Self-hosted", label: "Self-hosted", emoji: "🏠", color: "blue", category: "platform" },
  { id: "Reliable", label: "Reliable", emoji: "🛡️", color: "green", category: "purpose" },
  { id: "Research-focused", label: "Research", emoji: "🔬", color: "indigo", category: "purpose" },
  { id: "RAG", label: "RAG", emoji: "📖", color: "indigo", category: "purpose" },
];

export const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400", border: "border-pink-500/20" },
  red: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", border: "border-red-500/20" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500/20" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-600 dark:text-yellow-400", border: "border-yellow-500/20" },
  green: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", border: "border-green-500/20" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", border: "border-teal-500/20" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/20" },
};

export const getTagColor = (color: string) =>
  TAG_COLORS[color] || TAG_COLORS.blue;
