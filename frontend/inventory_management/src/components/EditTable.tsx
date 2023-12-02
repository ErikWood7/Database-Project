import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { postToAPI } from "../utils/postToAPI.ts";
 
 
export default function EditTable({ TABLE_HEAD, TABLE_ROWS, HEADING, setSelectedTableRow, setOpen }: {TABLE_HEAD: any, TABLE_ROWS: any, HEADING: any, setSelectedTableRow: any, setOpen: any }) {
  var new_el: any = {};
  TABLE_HEAD.forEach((head: string) => {
      if (head != "") new_el[head.toLowerCase().replaceAll(" ", "_")] = "";
  });

  const [editRow, setEditRow] = useState<number[]>([]);

  const [newElement, setNewElement] = useState<any>(new_el);
  const postInsert = (row_idx: number) => {
          let params_to_post; 
          let url_to_post: string = "";
          if (HEADING == "Customer Details"){
              params_to_post = {
                      'customer_email': newElement['email'],
                      'name': newElement['name'],
                      'phone_num': newElement['phone_number']
                  }
              url_to_post = 'insertConsumer/'
          } else if (HEADING == "Vehicle Details") {
                  params_to_post = {
                          "vin": newElement['vin'],
                          "customer_email": newElement['owned_by'],
                          "year": newElement['year'],
                          "make_and_model": newElement['make_and_model'],
                          "paint_code": newElement['paint_code'],
                      }
                  url_to_post = 'insertVehicle/';
          } else if (HEADING == "Part Details") {
                  params_to_post = {
                          "repair_id": newElement['repair_id'],
                          "part_detail": newElement['part_detail'],
                          "order_status": newElement['order_status'],
                      }
                  url_to_post = 'insertPart/';
          } else if (HEADING == "Repair Details") {
                  params_to_post = {
                          "vin": newElement['vin'],
                          "repair_detail": newElement['repair_detail'],
                          "note": newElement['note'],
                      }
                  url_to_post = 'insertRepair/';
              }
          // console.log(params_to_post)
          postToAPI(url_to_post, params_to_post).then(() => {
                  // console.log(data);
                  let tempEl = TABLE_ROWS[row_idx]
                  Object.keys(tempEl).map((key) => { tempEl[key] = new_el[key]; })
                  TABLE_ROWS[row_idx] = tempEl;
                  setSelectedTableRow([...TABLE_ROWS])
                  setNewElement(new_el)
                  setOpen(false);
                  window.location.reload(); 
              }).catch(() => {
                  // console.log(data);
                  let tempEl = TABLE_ROWS[row_idx]
                  Object.keys(tempEl).map((key) => { tempEl[key] = new_el[key]; })
                  TABLE_ROWS[row_idx] = tempEl;
                  setSelectedTableRow([...TABLE_ROWS])
                  setNewElement(new_el)
                  setOpen(false);
                  window.location.reload(); 
              })

      }

  const postUpdate = (row_idx: number) => {
      let params_to_post; 
      let tempElementSelected  = TABLE_ROWS[row_idx]
      let url_to_post: string = "";
      if (HEADING == "Customer Details"){
          params_to_post = {
                  'customer_email': tempElementSelected['email'],
                  'name': tempElementSelected['name'],
                  'phone_num': tempElementSelected['phone_number']
              }
          url_to_post = 'updateConsumer/'
      } else if (HEADING == "Vehicle Details") {
              params_to_post = {
                      "vin": tempElementSelected['vin'],
                      "customer_email": tempElementSelected['owned_by'],
                      "year": tempElementSelected['year'],
                      "make_and_model": tempElementSelected['make_and_model'],
                      "paint_code": tempElementSelected['paint_code'],
                  }
              url_to_post = 'updateVehicle/';
      } else if (HEADING == "Part Details") {
              params_to_post = {
                      "part_id": tempElementSelected['part_id'],
                      "repair_id": tempElementSelected['repair_id'],
                      "part_detail": tempElementSelected['part_detail'],
                      "order_status": tempElementSelected['order_status'],
                  }
              url_to_post = 'updatePart/';
      } else if (HEADING == "Repair Details") {
              params_to_post = {
                      "repair_id": tempElementSelected['repair_id'],
                      "vin": tempElementSelected['vin'],
                      "repair_detail": tempElementSelected['repair_detail'],
                      "note": tempElementSelected['note'],
                  }
              url_to_post = 'updateRepair/';
          }
      // console.log(params_to_post)
      postToAPI(url_to_post, params_to_post).then(data => {
              // console.log("Update");
              // console.log(data);
              setOpen(false);
              /*
              let tempEl = TABLE_ROWS[row_idx]
              Object.keys(tempEl).map((key) => { tempEl[key] = new_el[key]; })
              TABLE_ROWS[row_idx] = tempEl;
              setSelectedTableRow([...TABLE_ROWS])
              setNewElement(new_el)

              setEditRow([])
              */
              window.location.reload(); 
          }).catch(data => {
              // console.log(data);
              setOpen(false);
              /*
              let tempEl = TABLE_ROWS[row_idx]
              Object.keys(tempEl).map((key) => { tempEl[key] = new_el[key]; })
              TABLE_ROWS[row_idx] = tempEl;
              setSelectedTableRow([...TABLE_ROWS])
              setNewElement(new_el)
              setEditRow([])
              */
              window.location.reload(); 
          })
  }


  const changeTableContent = (val: string, el: any, row_idx: number, key: string) => {
      el[key] = val
      TABLE_ROWS[row_idx] = el
      setSelectedTableRow([...TABLE_ROWS])
      setEditRow((prevEditRows) => ([row_idx, ...prevEditRows]))
      }
  const changeElementToAdd = (val: string, key: string) => {
      setNewElement((prevElement: any) => {
              prevElement[key] = val
              // console.log(prevElement)
              return prevElement;
          })
      }
  const deleteRow = (row_idx: number) => {
      let url_to_post: string = "";
      let params_to_post: any;
      let tempElementSelected  = TABLE_ROWS[row_idx]
      if (HEADING == "Customer Details"){
          params_to_post = {
                  'customer_email': tempElementSelected['email'],
              }
          url_to_post = 'deleteConsumer/'
      } else if (HEADING == "Vehicle Details") {
              params_to_post = {
                      "vin": tempElementSelected['vin'],
                  }
              url_to_post = 'deleteVehicle/';
      } else if (HEADING == "Part Details") {
              params_to_post = {
                      "repair_id": tempElementSelected['repair_id'],
                  }
              url_to_post = 'deletePart/';
      } else if (HEADING == "Repair Details") {
              params_to_post = {
                      "repair_id": tempElementSelected['repair_id'],
                  }
              url_to_post = 'deleteRepair/';
          }
      postToAPI(url_to_post, params_to_post).then(data => {
              // console.log(data)
              TABLE_ROWS.splice(row_idx, 1);
              setSelectedTableRow([...TABLE_ROWS])
              setOpen(false);
              window.location.reload(); 
          })
  }

  let table_data;
  let newRow: Boolean;
  let tempOptions: string[];
  const colsToAvoid = ["Part Id", "Number of Vehicles to Repair", "Number of Repairs", "Repair id", "Customer", "Car"]
  const colsToSelect = ["Repair Id", "Customer", "Car", "Vin", "Owned By"]
  const colsToNotUpdate = ["Email", "VIN", "Part Id", "Vin", "Number of Vehicles to Repair", "Number of Repairs", "Owned By", "Repair Id", "Customer", "Car", "Repair id"];
  return (
    <Card className="h-full w-full p-2">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head: string) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  key={head}
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
            newRow = true
            table_data = TABLE_HEAD.map((head:string, jdx:any) => {
              if (head == "") return 
              if (el[head.toLowerCase().replaceAll(" ", "_")] == '') {
                      if (colsToSelect.includes(head)) { 
                          if (HEADING == "Repair Details" && (head != "Vin")) { return <td className="p-4"></td> }
                          tempOptions = Array.from(new Set(TABLE_ROWS.map((tempRow: any) => ((tempRow[head.toLowerCase().replaceAll(" ", "_")]).toString())).filter((tempOption: string) => (typeof tempOption === 'string' && tempOption !== ''))))
                          return <td className="p-4" key={idx+jdx}>
                                <div className="w-full" key={idx+jdx}>
                                    <select onChange={(e)=>{changeElementToAdd(e.target.value, head.toLowerCase().replaceAll(" ", "_"))}} key={idx+jdx} id={head} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                      <option key="Default" value=""></option>
                                      { tempOptions.map((tempOption: string) => (<option key={tempOption.replaceAll(" ", "_")} value={tempOption.replaceAll(" ", "_")}>{tempOption}</option>)) }
                                    </select>
                                  </div>
                              </td>
                      }
                      if (colsToAvoid.includes(head)) { return <td className="p-4"></td> }
                      return <td key={idx+jdx} className="p-4">
                        <input
                          key={idx+jdx}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e)=>{changeElementToAdd(e.target.value, head.toLowerCase().replaceAll(" ", "_"))}}
                        />
                      </td>
                  }
              if (colsToNotUpdate.includes(head)) { 
                  return <td className="p-4" key={jdx+idx}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {el[head.toLowerCase().replaceAll(" ", "_")]}
                    </Typography>
                  </td>
                  }

              newRow = false
              return <td key={idx+jdx} className="p-4">
                <input
                  key={idx+jdx}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={el[head.toLowerCase().replaceAll(" ", "_")]}
                  value={el[head.toLowerCase().replaceAll(" ", "_")]}
                  onChange={(e)=>{changeTableContent(e.target.value, el, idx, head.toLowerCase().replaceAll(" ", "_"))}}
                />
              </td>
          })

            if (newRow) {
                return <tr key={idx} className="even:bg-blue-gray-50/50"> 
                  {table_data}
                  <td className="p-4">
                    <Typography as="a" onClick={() => postInsert(idx)} variant="small" color="green" className="font-medium hover:cursor-pointer">
                      Done
                    </Typography>
                  </td>
                </tr>
            }
            if (editRow.includes(idx)) {
                return <tr key={idx} className="even:bg-blue-gray-50/50"> 
                  {table_data}
                  <td className="p-4">
                    <Typography as="a" onClick={() => postUpdate(idx)} variant="small" color="green" className="font-medium hover:cursor-pointer">
                      Done
                    </Typography>
                  </td>
                </tr>
                }
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
