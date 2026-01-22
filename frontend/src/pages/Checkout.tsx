import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useCart } from "../context/cart/CartContext";
import { useRef } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const { cartItems, totalAmount } = useCart();
    const addressRef = useRef<HTMLInputElement>(null);

    const { token } = useAuth();
    const navigate = useNavigate();

    const handleConfirmOrder = async () => {
        const address = addressRef.current?.value;
        if (!address) {
            alert("Please enter a shipping address");
            return;
        }
        const response = await fetch(`${BASE_URL}/cart/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ address })
        })

        if (!response.ok) {
            return;
        }
        navigate('/order-success');
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Checkout Page</Typography>
            </Box>
            {cartItems.length === 0 ? <Typography sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', height: '60vh', color: "#757575", fontSize: "1.5rem" }}>Your cart is empty</Typography> :
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
                                </Box>
                            </Container>
                        ))}
                    </Box>
                    <Box sx={{ mt: 4, alignItems: 'center' }}>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5">Total Amount: ${totalAmount.toFixed(2)}</Typography>
                            <TextField label="Shipping Address" variant="outlined" fullWidth sx={{ maxWidth: '400px' }} name="address" inputRef={addressRef} />
                        </Box>
                        <Button onClick={handleConfirmOrder} variant="contained" color="primary" fullWidth sx={{ p: 1 }}>Pay now</Button>
                    </Box>
                </>
            }
        </Container>
    )



}

export default CheckoutPage;