import { Cookie } from "@mui/icons-material";
import axios from "axios";
import { Centrifuge } from "centrifuge";
import { CENTRIFUGE_URL, REFRESH_TOKENS_URL, ROOM_LIST_URL, USERS_ME_URL } from "constants/api";
import { LocalStorageService } from "./LocalStorageService";
import store from "redux/store";
import AlertsService from "./AlertsService";
import { setHasNotifications } from "redux/actions/notificationsActions";

export class NotificationsService {
  static centrifuge = null;

  static getCentrifugeToken() {
    return new Promise((resolve, reject) => {
      let refreshToken = Cookie.get("refresh_token");
      if (refreshToken) {
        axios
          .post(REFRESH_TOKENS_URL, {
            refresh_token: refreshToken,
          })
          .then((response) => {
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            this.login({
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
            resolve(accessToken);
          })
          .catch((error) => {
            this.logout();
            reject(error);
          });
      } else {
        this.logout();
      }
    }).catch((error) => {
      console.log(`Refresh Token Error: ${error}`);
    });
  }

  static connectCentrifuge(accessToken) {
    if (!accessToken) {
      return;
    }

    if (this.centrifuge) {
      this.centrifuge.disconnect();
    }

    this.centrifuge = new Centrifuge(CENTRIFUGE_URL, {
      token: accessToken,
      getToken: () => {
        return this.getCentrifugeToken();
      },
    });

    axios
      .get(USERS_ME_URL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const userId = response.data.id;
        const sub = this.centrifuge.newSubscription(`notifications:user#${userId}`);

        this.centrifuge.on("connecting", (ctx) => {
          console.log(`Centrifuge connecting: ${JSON.stringify(ctx)}`);
        });

        this.centrifuge.on("connected", (ctx) => {
          console.log(`Centrifuge connected: ${JSON.stringify(ctx)}`);
        });

        sub
          .on("publication", (ctx) => {
            let data = JSON.parse(ctx.data);
            console.log(`Centrifuge received publication: ${JSON.stringify(data)}`);

            const apartmentId = data.apartment_id;

            const ROOM_DETAILS_URL = `${ROOM_LIST_URL}${apartmentId}/`;

            axios
              .get(ROOM_DETAILS_URL)
              .then((response) => {
                const apartmentName = response.data.name;

                LocalStorageService.addPaymentNotification({
                  message: data.message,
                  apartmentId: apartmentId,
                  apartmentName: apartmentName,
                  startDate: data.start_date,
                  endDate: data.end_date,
                  succeededAt: data.succeeded_at,
                  price: data.price,
                  isNew: true,
                });
                store.dispatch(setHasNotifications(true));
              })
              .catch((error) => {
                console.log(
                  `Error when getting room name for storing notification: ${AlertsService.getAlertMessage(error)}`
                );
              });
          })
          .subscribe();

        this.centrifuge.on("disconnected", (ctx) => {
          console.log(`Centrifuge disconnected: ${JSON.stringify(ctx)}`);
        });

        this.centrifuge.connect();
      })
      .catch((error) => {
        console.log(`Centrifuge get userId error: ${AlertsService.getAlertMessage(error)}`);
      });
  }
}
