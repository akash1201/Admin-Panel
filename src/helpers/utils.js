export function getTitle(data) {
  let html = '';

  let block = data?.blocks[0];

  switch (block.type) {
    case 'paragraph':
      html += `${block.data.text} `;
      break;
    case 'header':
      html += `${block.data.text}`;
      break;
    // Handle other block types and inline styles
    default:
    // Handle unknown block types
  }

  return html;
}
