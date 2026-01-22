import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";

const OrderSuccessPage = () => {
    return (
        <Container fixed sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CheckCircleOutline sx={{ fontSize: 100, color: 'green' }} />
            <Typography variant="h4" component="h1" gutterBottom>
                Order Successful!
            </Typography>
            <Typography variant="body1">
                Thank you for your purchase. Your order has been placed successfully.
            </Typography>
            <Button href="/" variant="contained" color="primary" sx={{ mt: 3 }}>
                Back to Home
            </Button>
        </Container>
    );
}

export default OrderSuccessPage;