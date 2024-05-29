import React, { memo } from "react";
import { Button } from "react-bootstrap";

const DashboardTableRow = memo(
  ({ product, handleCheck }) => {
    return (
      <tr>
        <td>{product.id}</td>
        <td>{product.selling_price}</td>
        <td>{product.name}</td>
        <td>
          <Button variant="danger" onClick={() => handleCheck(product.id)}>
            Check
          </Button>
        </td>
      </tr>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.product.id === nextProps.product.id;
  }
);

export default DashboardTableRow;
