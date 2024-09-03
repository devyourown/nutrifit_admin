export function convertDtoToExcel(data: any) {
    return data.map((dto: any) => {
        return dto.orderItems.map((item: any) => {
            return {
                id: dto.id,
                item: item.name,
                quantity: item.quantity,
                recipientName: dto.ordererDto.recipientName,
                recipientPhone: dto.ordererDto.recipientPhone,
                ordererName: dto.ordererDto.ordererName,
                ordererPhone: dto.ordererDto.ordererPhone,
                address: dto.ordererDto.address + dto.ordererDto.addressDetail,
                cautions: dto.ordererDto.cautions,
            }
        })
    })
}