-- Verify batala:init_table on pg

BEGIN;

SELECT  id ,"url_img" ,"lastname" ,"firstname" ,"nickname" ,"email" ,"password" ,"birthdate" ,"phone" ,"address" ,"address_2" ,"zip_code" , "city","gender" ,"top_size","bottom_size" ,"subscription","deposit" ,"role" ,"created_at" ,"updated_at"FROM  user WHERE false; 
SELECT "id" ,"code" ,"pupitre" ,"observation" ,"profondeur" ,"tirants","poids" , "sticker","user_id","user" ,"created_at" ,"updated_at"FROM instrument WHERE false;
SELECT  "id", "label" , "gender" , "observation" , "quantity_s" , "quantity_m" , "quantity_l" , "quantity_xl" ,"quantity_xxl","quantity_xxxl"FROM suit WHERE false; 
SELECT "id", "user_id","suit_id"FROM user-has-suit WHERE false; 

ROLLBACK;
