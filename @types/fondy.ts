export type FondyType = {
  order_id: string,
  merchant_id: string,
  order_desc: string,
  currency: string,
  amount: number,
  response_url: string,
  signature?: string
}