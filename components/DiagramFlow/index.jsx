import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Controls, Background } from 'react-flow-renderer';

const initialNodes = [];
const initialEdges = [];

const DiagramFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState('#fff'); // default warna

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };
      const newNode = {
        id: `${nodes.length + 1}`,
        type: 'default',
        position,
        data: { label: `${type} Node` },
        style: {
          border: type === 'rectangle' ? '2px solid blue' : '2px solid red',
          borderRadius: type === 'circle' ? '50%' : '0',
          padding: 10,
          width: type === 'rectangle' ? 100 : 50,
          height: type === 'rectangle' ? 50 : 50,
          backgroundColor: newColor, // set warna default
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, newColor]
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onNodeDoubleClick = useCallback((event, node) => {
    setEditingNodeId(node.id);
    setNewLabel(node.data.label);
    setNewColor(node.style.backgroundColor || '#008000'); // default atau warna yang sudah ada
  }, []);

  const handleLabelChange = (event) => setNewLabel(event.target.value);
  const handleColorChange = (event) => setNewColor(event.target.value);

  const handleLabelSave = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === editingNodeId
          ? { ...node, data: { ...node.data, label: newLabel }, style: { ...node.style, backgroundColor: newColor } }
          : node
      )
    );
    setEditingNodeId(null);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }} className="p-2">
      <div className="flex w-1/6 flex-col gap-3 p-2 border-2 rounded-md">
        <h2 className="text-lg font-semibold">Choose Options:</h2>
        <div className="flex gap-2">
          <button
            onDragStart={(event) => onDragStart(event, 'rectangle')}
            draggable
            className="border-2 bg-green-500 w-32 h-10"
          />
          <button
            onDragStart={(event) => onDragStart(event, 'circle')}
            draggable
            className="border-2 bg-green-500 rounded-full w-10 h-10"
          />
        </div>
      </div>

      <div style={{ width: '100%', height: '90vh' }} onDragOver={onDragOver} onDrop={onDrop}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              label:
                editingNodeId === node.id ? (
                  <div className='flex flex-col bg-white w-full '>
                    <input
                      type="text"
                      value={newLabel}
                      className="focus:outline-none p-2 w-52"
                      onChange={handleLabelChange}
                      autoFocus
                      style={{ width: '100%' }}
                    />
                    <input
                      type="color"
                      value={newColor}
                      onChange={handleColorChange}
                      className="mt-2"
                    />
                    <button onClick={handleLabelSave} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
                      Save
                    </button>
                  </div>
                ) : (
                  node.data.label
                ),
            },

          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          fitView
        >
          <Controls />
          <Background color="#fff" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DiagramFlow;

