import { createDeliveryClient } from "@kontent-ai/delivery-sdk";

export const deliveryClient = createDeliveryClient({
  environmentId: "e3428e80-3966-0085-ee98-3bee1120f101",
  secureApiKey:
    "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogIjcxYjA2OTY0ODE5NTRmNjI4YjA5ZGQ2NzZjNmYwMWJiIiwNCiAgImlhdCI6ICIxNjc2NTI3MTUxIiwNCiAgImV4cCI6ICIxNzA4MDYzMTQwIiwNCiAgInZlciI6ICIxLjAuMCIsDQogICJwcm9qZWN0X2lkIjogImUzNDI4ZTgwMzk2NjAwODVlZTk4M2JlZTExMjBmMTAxIiwNCiAgImF1ZCI6ICJkZWxpdmVyLmtlbnRpY29jbG91ZC5jb20iDQp9.pwiythDp7iXJLTbOwC868UnS0j8wj1DwWyYUViFBLXI",
  defaultQueryConfig: {
    useSecuredMode: true,
  },
});

export const EventID = "04f6919c-7c2c-4397-b46c-efcfcab1539a";
export const SITE_NAME = "Creation House";
export const SITE_URL = "https://creation-house.ae/";

