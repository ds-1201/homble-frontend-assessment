import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardHeight = {
  sm: "20vh",
  md: "30vh",
  lg: "40vh",
  xl: "50vh",
  xxl: "60vh",
};

const ProductCard = ({ product }) => {
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
      to={`/product/${product.id}`}
    >
      <Card
        style={{
          width: "100%",
          minHeight: CardHeight,
          cursor: "pointer",
        }}
      >
        <Card.Img variant="top" src={product.productImage} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.description}
            <br />
            <small>{product.allergen_info}</small>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
