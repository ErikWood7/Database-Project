import { useEffect, useState } from 'react'
import { Modal, Table } from './'
import { fetchFromAPI } from "../utils/fetchFromAPI.ts";

const CONSUMER_TABLE_HEAD = ["Name", "Email", "Phone Number", "Number of Vehicles to Repair", "Number of Repairs", ""];
const VEHICLE_TABLE_HEAD = [
            "VIN",
            "Owned By",
            "Make and Model",
            "Paint Code",
            "Year",
            ""];
 
const REPAIR_TABLE_HEAD = [
            "Repair id",
            "Repair Detail",
            "Car",
            "Vin",
            "Customer",
            "Note",
            ""];
 
const PART_TABLE_HEAD = [
            "Part Id",
            "Repair Id",
            "Part Detail",
            "Order Status",
            "Car",
            "Customer",
            ""];
 

function Dashboard() {
  const [open, setOpen] = useState(false)

  const [CONSUMER_TABLE_ROWS, set_CONSUMER_TABLE_ROWS] = useState<any>({})
  const [VEHICLE_TABLE_ROWS, set_VEHICLE_TABLE_ROWS] = useState<any>({})
  const [REPAIR_TABLE_ROWS, set_REPAIR_TABLE_ROWS] = useState<any>({})
  const [PART_TABLE_ROWS, set_PART_TABLE_ROWS] = useState<any>({})

  const [loading, setLoading] = useState(true)
  useEffect(() => {
          fetchFromAPI("getConsumerTableRows/").then((data: any)=> {
                  data = Object.values(data)
                  set_CONSUMER_TABLE_ROWS(data);
                  // console.log(data)
                  })

          fetchFromAPI("getVehicleTableRows/").then((data: any)=> {
                  data = Object.values(data)
                  set_VEHICLE_TABLE_ROWS(data);
                  //console.log(data)
                  })

          fetchFromAPI("getRepairTableRows/").then((data: any)=> {
                  data = Object.values(data)
                  set_REPAIR_TABLE_ROWS(data);
                  console.log("Repair data")
                  console.log(data)
                  })

          fetchFromAPI("getPartTableRows/").then((data: any)=> {
                  data = Object.values(data)
                  set_PART_TABLE_ROWS(data);
                  setLoading(false)
                  // console.log(data)
                  })

      }, [])

  const [selectedTableHead, setSelectedTableHead] = useState<string[]>([])
  const [selectedTableRow, setSelectedTableRow] = useState<any>({})
  const [heading, setHeading] = useState("")

  const openModal = (type_: string) => {
        switch(type_) {
            case "CONSUMER":
                setSelectedTableRow(CONSUMER_TABLE_ROWS);
                setSelectedTableHead(CONSUMER_TABLE_HEAD);
                setHeading("Customer Details")
                break;
            case "VEHICLE":
                setSelectedTableRow(VEHICLE_TABLE_ROWS);
                setSelectedTableHead(VEHICLE_TABLE_HEAD);
                setHeading("Vehicle Details")
                break;
            case "PART":
                setSelectedTableRow(PART_TABLE_ROWS);
                setSelectedTableHead(PART_TABLE_HEAD);
                setHeading("Part Details")
                break;
            case "REPAIR":
                setSelectedTableRow(REPAIR_TABLE_ROWS);
                setSelectedTableHead(REPAIR_TABLE_HEAD);
                setHeading("Repair Details")
                break;
        }
        setOpen(true);
      }
  if (loading) {
      return "Loading"
      }
  return (
    <div className="grid grid-rows-3 overflow-hidden">
        <Modal open={open} setOpen={setOpen} TABLE_HEAD={selectedTableHead} TABLE_ROWS={selectedTableRow} HEADING={heading} setSelectedTableRow={setSelectedTableRow} />
        <div className="flex items-center grid grid-cols-4  overflow-hidden">
            <div className="flex items-center col-span-1 border-2 h-full relative">
                <div>
                    <h1 className="text-xl font-bold pl-3 ml-3 pt-3 mt-3 absolute top-6">KPIs</h1>
                    <p className="pl-5 ml-5 mt-2 pb-5 relative top-2">
                        <b onClick={()=>{openModal("CONSUMER")}} className="hover:cursor-pointer">Number of Customers to Serve:</b> {CONSUMER_TABLE_ROWS.length}<br />
                        <b onClick={()=>{openModal("VEHICLE")}} className="hover:cursor-pointer">Number of Vehicles to Repair:</b> {VEHICLE_TABLE_ROWS.length}<br />
                        <b onClick={()=>{openModal("REPAIR")}} className="hover:cursor-pointer">Number of Repairs Pending:</b> {REPAIR_TABLE_ROWS.length}<br />
                        <b onClick={()=>{openModal("PART")}} className="hover:cursor-pointer">Number of Parts Orders:</b> {PART_TABLE_ROWS.length}<br />
                    </p>
                </div>
            </div>
            <div className="col-span-3 border-2 h-full overflow-hidden">
                <div onClick={()=>{openModal("CONSUMER")}} className='grid grid-cols-2 relative'>
                    <h1 className="hover:cursor-pointer text-xl font-bold pl-3 ml-3 pt-3 mt-3">Customer Detail</h1>
                    <h1 className="text-xl font-bold pr-6 ml-3 pt-3 mt-3 text-[#5156c0] absolute right-0 hover:cursor-pointer">Add</h1>
                </div>
                <Table TABLE_HEAD={CONSUMER_TABLE_HEAD} TABLE_ROWS={CONSUMER_TABLE_ROWS} openModal={openModal} HEAD={"CONSUMER"} />
            </div>
        </div>
        <div className="grid grid-cols-2">
            <div className="border-2 h-full overflow-hidden">
                <div onClick={()=>{openModal("VEHICLE")}} className='grid grid-cols-2 relative'>
                    <h1 className="hover:cursor-pointer text-xl font-bold pl-3 ml-3 pt-3 mt-3">Vehicle Details</h1>
                    <h1 className="text-xl font-bold pr-6 mr-3 pt-3 mt-3 text-[#5156c0] absolute right-0 hover:cursor-pointer">Add</h1>
                </div>
                <Table TABLE_HEAD={VEHICLE_TABLE_HEAD} TABLE_ROWS={VEHICLE_TABLE_ROWS} openModal={openModal} HEAD={"VEHICLE"} />
            </div>
            <div className="border-2 h-full overflow-hidden">
                <div onClick={()=>{openModal("PART")}} className='grid grid-cols-2 relative'>
                    <h1 className="hover:cursor-pointer text-xl font-bold pl-3 ml-3 pt-3 mt-3">Part Details</h1>
                    <h1 className="text-xl font-bold pr-6 mr-3 pt-3 mt-3 text-[#5156c0] absolute right-0 hover:cursor-pointer">Add</h1>
                </div>
                <Table TABLE_HEAD={PART_TABLE_HEAD} TABLE_ROWS={PART_TABLE_ROWS} openModal={openModal} HEAD={"PART"} />
            </div>
        </div>
            <div className="border-2 h-full overflow-hidden">
                <div onClick={()=>{openModal("REPAIR")}} className='grid grid-cols-2 relative'>
                    <h1 className="hover:cursor-pointer text-xl font-bold pl-3 ml-3 pt-3 mt-3">Repair Details</h1>
                    <h1 className="text-xl font-bold pr-6 mr-3 pt-3 mt-3 text-[#5156c0] absolute right-0 hover:cursor-pointer">Add</h1>
                </div>
                <Table TABLE_HEAD={REPAIR_TABLE_HEAD} TABLE_ROWS={REPAIR_TABLE_ROWS} openModal={openModal} HEAD={"REPAIR"} />
            </div>
    </div>
  )
}

export default Dashboard
