"use client";

// import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/components/Heading";
import Status from "@/components/Status";
import {
  MdAccessTimeFilled,
  MdDelete,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/components/ActionBtn";
import { useRouter } from "next/navigation";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";

interface OrdersClientProps {
  orders: any[];
}

type ExtendedOrder = any & {
  user: any;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {

    const router = useRouter();

    let rows: any = [];
  
    if (orders) {
      rows = orders.map((order) => {
        return {
          id: order.id,
          customer: order?.user?.name,
          products: order.products,
          amount: formatPrice(order.amount),
          paymentStatus: order.status,
          date: order.createDate ? moment(order.createDate).fromNow() : "",
          deliveryStatus: order.deliveryStatus,
        };
      });
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "customer", headerName: "Customer Name", width: 130 },
        {
          field: "amount",
          headerName: "Amount(USD)",
          width: 130,
          renderCell: (params) => {
            return (
              <div className="font-bold text-slate-800">{params.row.amount}</div>
            );
          },
        },
        {
          field: "paymentStatus",
          headerName: "Payment Status",
          width: 130,
          renderCell: (params) => {
            return (
              <div>
                {params.row.paymentStatus === "pending" ? (
                  <Status
                    text="pending"
                    icon={MdAccessTimeFilled}
                    bg="bg-slate-200"
                    color="text-slate-700"
                  />
                ) : params.row.paymentStatus === "complete" ? (
                  <Status
                    text="completed"
                    icon={MdDone}
                    bg="bg-green-200"
                    color="text-green-700"
                  />
                ) : (
                  <></>
                )}
              </div>
            );
          },
        },
        {
          field: "deliveryStatus",
          headerName: "Delivery Status",
          width: 130,
          renderCell: (params) => {
            return (
              <div>
                {params.row.deliveryStatus === "pending" ? (
                  <Status
                    text="pending"
                    icon={MdAccessTimeFilled}
                    bg="bg-slate-200"
                    color="text-slate-700"
                  />
                ) : params.row.deliveryStatus === "dispatched" ? (
                  <Status
                    text="dispatched"
                    icon={MdDeliveryDining}
                    bg="bg-purple-200"
                    color="text-purple-700"
                  />
                ) : params.row.deliveryStatus === "delivered" ? (
                  <Status
                    text="delivered"
                    icon={MdDone}
                    bg="bg-green-200"
                    color="text-green-700"
                  />
                ) : (
                  <></>
                )}
              </div>
            );
          },
        },
        {
          field: "date",
          headerName: "Date",
          width: 130,
        },
        {
          field: "action",
          headerName: "Actions",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="flex justify-start gap-4 w-full mt-[10.35px]">
                <ActionBtn
                  icon={MdRemoveRedEye}
                  onClick={() => {
                    router.push(`/order/${params.row.id}`);
                  }}
                />
                
                <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id);
              }}
            />
              </div>
            );
          },
        },
      ];

  const handleDelete = (id : string) => {
    if (!confirm("Are you sure you want to delete this order?")) return ;

    axios
    .delete(`/api/order/${id}`)
    .then(() => {
        toast.success("Order deleted successfully..")
        router.refresh()
    })
    .catch((error) => {
        toast.error("Something went wrong..")
        console.log(error)
    })
  }

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Your Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}

export default OrdersClient