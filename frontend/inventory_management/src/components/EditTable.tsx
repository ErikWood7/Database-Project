;import { Card, Typography } from "@material-tailwind/react";
 
 
export default function EditTable({ TABLE_HEAD, TABLE_ROWS, HEADING, setSelectedTableRow  }: {TABLE_HEAD: any, TABLE_ROWS: any, HEADING: any, setSelectedTableRow: any }) {
  const changeTableContent = (val: string, el: any, row_idx: number, key: string) => {
      console.log(HEADING)
      el[key] = val
      TABLE_ROWS[row_idx] = el
      console.log(TABLE_ROWS)
      setSelectedTableRow([...TABLE_ROWS])
      }
  const deleteRow = (row_idx: number) => {
      TABLE_ROWS.splice(row_idx, 1);
      setSelectedTableRow([...TABLE_ROWS])
  }

  let table_data;
  return (
    <Card className="h-full w-full p-2">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head: string) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((el: any, idx: any) => {
            table_data = TABLE_HEAD.map((head:string) => {
              if (head == "") return 
              return <td className="p-4">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={el[head.toLowerCase().replaceAll(" ", "_")]}
                  value={el[head.toLowerCase().replaceAll(" ", "_")]}
                  onChange={(e)=>{changeTableContent(e.target.value, el, idx, head.toLowerCase().replaceAll(" ", "_"))}}
                />
              </td>
          })

            return <tr key={idx} className="even:bg-blue-gray-50/50"> 
              {table_data}
              <td className="p-4">
                <Typography as="a" onClick={() => deleteRow(idx)} variant="small" color="red" className="font-medium hover:cursor-pointer">
                  Delete
                </Typography>
              </td>
            </tr>
            })}
        </tbody>
      </table>
    </Card>
  );
}
