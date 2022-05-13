import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProducts, toggleChecked } from "./productsSlice";

export default function ProductTable({
  productIndex,
}: {
  productIndex: number;
}) {
  const productCatlogue = useAppSelector(selectProducts);
  const productsList: any[] = productCatlogue[productIndex].itemList;
  const dispatch = useAppDispatch();

  const selectedSum = React.useMemo(() => {
    return productsList.reduce(
      (acc, curr) => (curr.checked ? acc + curr.amount : acc),
      0
    );
  }, [productsList]);
  console.log(productsList);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsList.map((row, index) => (
            <TableRow key={row.listemitemname + row.amount}>
              <TableCell>
                <input
                  onChange={() =>
                    dispatch(toggleChecked({ index, productIndex }))
                  }
                  type="checkbox"
                  checked={!!row.checked}
                />
              </TableCell>
              <TableCell>{row.listemitemname}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell align="right">Total: {selectedSum}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
