import { Container, Typography } from "@mui/material";
import { useCart } from "../context/cart/CartContext";

const CartPage = () => {
    const { cartItems, totalAmount } = useCart();

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">Cart Page</Typography>
            {cartItems.map(item => (
                <Container key={item.productId} sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: '1px solid #ccc', pb: 2 }}>
                    <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '16px' }} />
                    <div>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography>Quantity: {item.quantity}</Typography>
                        <Typography>Unit Price: ${item.unitPrice.toFixed(2)}</Typography>
                        <Typography>Total: ${(item.unitPrice * item.quantity).toFixed(2)}</Typography>
                    </div>
                </Container>
            ))}
            <Typography variant="h5">Total Amount: ${totalAmount.toFixed(2)}</Typography>
        </Container>
    )

}

export default CartPage;