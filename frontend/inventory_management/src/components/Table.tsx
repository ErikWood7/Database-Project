;import { Card, Typography } from "@material-tailwind/react";
 
 
export default function Table({ TABLE_HEAD, TABLE_ROWS, openModal, HEAD }: {TABLE_HEAD: any, TABLE_ROWS: any, openModal: any, HEAD: string}) {
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
            table_data = TABLE_HEAD.map((head:string, jdx:any) => {
              if (head == "") return 
              return <td className="p-4" key={jdx+idx}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {el[head.toLowerCase().replaceAll(" ", "_")]}
                </Typography>
              </td>
          })

            return <tr key={idx} className="even:bg-blue-gray-50/50"> 
              {table_data}
              <td className="p-4">
                <Typography onClick={()=>{openModal(HEAD)}} variant="small" color="blue-gray" className="font-medium hover:cursor-pointer">
                  Edit
                </Typography>
              </td>
            </tr>
            })}
        </tbody>
      </table>
    </Card>
  );
}
