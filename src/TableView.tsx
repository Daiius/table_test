import React from 'react';

import Table from 'react-bootstrap/Table';

interface Data {
  name: string;
  test: number;
  key: string;
  children: Data[];
}

const data: Data[] = [
  { name: "alice", test: 0, key: "A", children: [
    { name: "bob"  , test: 1, key: "B", children: [] },
    { name: "cathy", test: 2, key: "C", children: [] },
  ]},
  { name: "dia", test: 3, key: "D", children: [] }
];

const TableView = () => {
  
  interface DataComponentProps {
    data: Data[]
  }
  const DataComponent = (props: DataComponentProps) => {
    const { data } = props;
    return (
      <>
        {data.length > 0 &&
        <>
          <Table style={{marginLeft: "2rem"}}>
            <thead>
              <tr>
                {Object.keys(data[0])
                       .filter(key => key != "children")
                       .map((key, i) =>
                  <th key={i}>{key}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((entry, i) =>
                <React.Fragment key={i}>
                <tr>
                  {Object.entries(entry)
                         .filter(([key, _]) => key != "children")
                         .map(([_, value], i) => {
                    console.log(value);
                    return <td key={i}>{value}</td>
                  })}
                </tr>
                {entry.children.length > 0 &&
                  <tr>
                    <td colSpan={5}>
                      <DataComponent data={entry.children} />
                    </td>
                  </tr>
                }
                </React.Fragment>
              )}
            </tbody>
          </Table>
        </>
        }
      </>
    );
  };

  return (
    <DataComponent data={data} />
  );
};

export default TableView;
