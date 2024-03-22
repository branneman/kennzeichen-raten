import React from 'react';

export default function Namesake(props) {
  const namesake = props.namesake;

  return (
    <React.Fragment>
      {namesake.map((o, i) => {
        if (o.tag) {
          // Only create a tag if 'tag' is not an empty string
          const Tag = o.tag === 'mark' ? 'mark' : 'span'; // Default to 'span' if not 'strong'
          return <Tag key={i}>{o.str}</Tag>;
        }
        // If 'tag' is an empty string, return the string directly
        return <React.Fragment key={i}>{o.str}</React.Fragment>;
      })}
    </React.Fragment>
  );
}
