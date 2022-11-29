
# DELIMITER $$
# create procedure getAppointmentDetail(appId int)
# BEGIN
#
#    insert into appoints_service
#
# END $$
# DELIMITER ;

select service.name, service.description, service.price, appoints_service.appointment_id
     from service
     inner join appoints_service
     on appoints_service.service_id = service.service_id
     where appoints_service.appointment_id = 4;