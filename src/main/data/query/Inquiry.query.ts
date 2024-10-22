const createInquiryQuery:string="INSERT INTO Inquiry (persist_user_id, text,content) VALUES (?, ?, ?)"

export const inquiryQuery={
  create:createInquiryQuery,
}
