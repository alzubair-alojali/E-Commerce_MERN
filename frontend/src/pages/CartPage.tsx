import { Container, Typography, Box, ButtonGroup, Button } from "@mui/material";
import { useCart } from "../context/cart/CartContext";

const CartPage = () => {
    const { cartItems, totalAmount, updateItemQuantity, removeItemInCart, clearCart } = useCart();



    const handleUpdateItemQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            return;
        }
        updateItemQuantity(productId, quantity);
    }

    const handleRemoveItem = (productId: string) => {
        removeItemInCart(productId);
    }



    return (
        <Container sx={{ mt: 2 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Cart Page</Typography>
                <Button onClick={() => clearCart()} variant="outlined" sx={{ mt: 1, color: "#f44336", border: "none" }}>Clear Cart</Button>
            </Box>
            {cartItems.length === 0 ? <Typography sx={{alignItems: 'center' , display: 'flex', justifyContent: 'center', height: '60vh',color: "#757575",fontSize: "1.5rem" }}>Your cart is empty</Typography> :
                <>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        {cartItems.map(item => (
                            <Container key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '1px solid #ccc', pb: 2 }}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '16px' }} />
                                        <div>
                                            <Typography variant="h6">{item.title}</Typography>
                                            <Typography>Quantity: {item.quantity}</Typography>
                                            <Typography>Unit Price: ${item.unitPrice.toFixed(2)}</Typography>
                                            <Typography>Total: ${(item.unitPrice * item.quantity).toFixed(2)}</Typography>
                                        </div>
                                    </Box>
                                    <Button onClick={() => handleRemoveItem(item.productId)} variant="outlined" sx={{ mt: 1, color: "#f44336", border: "none" }}>Remove item</Button>
                                </Box>
                                <ButtonGroup>
                                    <Button variant="contained" color="primary" onClick={() => handleUpdateItemQuantity(item.productId, item.quantity - 1)}>-</Button>
                                    <Button variant="contained" color="primary" onClick={() => handleUpdateItemQuantity(item.productId, item.quantity + 1)}>+</Button>
                                </ButtonGroup>
                            </Container>
                        ))}
                    </Box>
                    <Typography variant="h5">Total Amount: ${totalAmount.toFixed(2)}</Typography>
                </>
            }
        </Container>
    )
}

export default CartPage;
