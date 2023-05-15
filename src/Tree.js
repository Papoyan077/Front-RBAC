import React, { useState } from "react";

function TreeNode({ data, searchQuery }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredChildren = data.children.filter((child) =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <div onClick={handleToggleExpand}>
        {data.name} ({filteredChildren.length}/{data.children.length})
        {isExpanded ? "-" : "+"}
      </div>
      {isExpanded && (
        <ul>
          {filteredChildren.map((child) => (
            <TreeNode key={child.id} data={child} searchQuery={searchQuery} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Tree({ data }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      {/* input field for search */}
      <input type="text" value={searchQuery} onChange={handleSearchInputChange} />

      {/* tree data */}
      <ul>
        {data.map((item) => (
          <TreeNode key={item.id} data={item} searchQuery={searchQuery} />
        ))}
      </ul>
    </div>
  );
}

export default Tree;
