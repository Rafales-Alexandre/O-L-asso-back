-- Verify batala:init_tables 

-- Will select one of every value from every table that return false. If everything is true, then the table creations worked perfectly 
BEGIN;

-- SELECT DOMAIN "postal_code_fr" IS NULL RETURN FALSE;

-- SELECT DOMAIN "email" IS NULL RETURN FALSE ;

-- SELECT TYPE "gender" RETURN FALSE ;

-- SELECT TYPE "size" RETURN FALSE ;

-- SELECT TYPE "pupitre" RETURN FALSE ;

-- SELECT TYPE "role" RETURN FALSE ;


SELECT id ,url_img,lastname,firstname,nickname,email,password,birthdate,phone,address,address_2,zip_code,city,gender,top_size,bottom_size,subscription,deposit,role,created_at,updated_at FROM  "user" WHERE false ; 

SELECT id,code,pupitre,observation,depth,rods,weight,sticker,user_id,created_at,updated_at FROM "instrument" WHERE false ;

SELECT id,label,gender,observation,quantity_s,quantity_m,quantity_l,quantity_xl,quantity_xxl,quantity_xxxl,created_at,updated_at FROM "suit" WHERE false ;

SELECT id,user_id,suit_id,created_at,updated_at FROM "user_has_suit" WHERE false ;

ROLLBACK;
