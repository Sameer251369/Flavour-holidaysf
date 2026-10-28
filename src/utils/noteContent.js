const HEADING = /^(#{2,4})\s+(.*)$/;
const BULLET = /^[-*]\s+(.*)$/;

export const splitEmphasis = (text = '') =>
  String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('**') && part.endsWith('**')
        ? { strong: true, text: part.slice(2, -2) }
        : { strong: false, text: part }
    );

export const parseNoteContent = (content = '') => {
  const blocks = [];
  let list = null;

  const flushList = () => {
    if (list && list.length) {
      blocks.push({ type: 'list', items: list.map((item) => splitEmphasis(item)) });
    }
    list = null;
  };

  String(content)
    .split(/\r?\n/)
    .forEach((rawLine) => {
      const line = rawLine.trim();

      if (!line) {
        flushList();
        return;
      }

      const heading = line.match(HEADING);
      if (heading) {
        flushList();
        blocks.push({
          type: heading[1].length >= 4 ? 'h4' : 'h3',
          segments: splitEmphasis(heading[2])
        });
        return;
      }

      const bullet = line.match(BULLET);
      if (bullet) {
        list = list || [];
        list.push(bullet[1]);
        return;
      }

      flushList();
      blocks.push({ type: 'p', segments: splitEmphasis(line) });
    });

  flushList();
  return blocks;
};
