/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51Nog61SA4OK32J08UM6637YAoAZy290u0Nm66CanKTATSXH6lUxMN0wAOYYPdG9dPSUfodwXVo3KThUoS3ywLOxy004Kd4EWqZ',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from api
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2) Create checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
