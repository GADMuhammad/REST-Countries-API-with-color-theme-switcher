// Single source of truth for the page's horizontal rhythm: every section
// (header, controls, grid, detail view) lines up to the same edges.
export default function Container({ as: Tag = "div", className = "", children }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1264px] px-6 sm:px-10 lg:px-16 ${className}`}
    >
      {children}
    </Tag>
  );
}
