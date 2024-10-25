const createInquiryQuery:string="INSERT INTO Inquiry (persist_user_id, title, content) VALUES (?, ?, ?)"
const findAllInquiryQuery:string="SELECT * FROM Inquiry"
export const inquiryQuery={
  create:createInquiryQuery,
  find_all:findAllInquiryQuery,
}
