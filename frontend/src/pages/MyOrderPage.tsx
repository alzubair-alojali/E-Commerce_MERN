import { useEffect } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { Box, Container, Typography, Paper } from "@mui/material";

const MyOrderPage = () => {

    const { myOrders, getMyOrders } = useAuth();

    useEffect(() => {
        getMyOrders();
    }, []);


    return (
        <Container fixed sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">My Orders</Typography>
            {myOrders.map((order) => (
                <Paper key={order._id} elevation={3} sx={{ p: 2 }}>
                    <Typography variant="body2" sx={{ mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1 }}>Address: {order.address}</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {order.orderItems.map((item) => (
                            <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <img
                                    src={item.productImage}
                                    alt={item.productTitle}
                                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1">{item.productTitle}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.quantity} x ${item.unitPrice}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" fontWeight="medium">
                                    ${item.quantity * item.unitPrice}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Total: ${order.total}</Typography>
                    </Box>
                </Paper>
            ))}
        </Container>
    )
}
export default MyOrderPage;