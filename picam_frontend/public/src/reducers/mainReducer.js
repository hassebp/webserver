
const initialState = {

    config: [],
    videos: [

    ],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "GET_CONFIG":
            return {
                ...state,
                config: action.payload,
            }
        case "DEL_PI":

            let indexValueDel = state.config.findIndex(x => x.ip === action.payload.ip)

            let newConfigFinalDel = state.config;
            newConfigFinalDel.splice(indexValueDel, 1)

            return {
                ...state,
                config: newConfigFinalDel,
            }
        case "ADD_PI":


            let newConfigFinalAdd = state.config;
            newConfigFinalAdd.splice(state.config.length, 0, {
                fps: 90,
                length: 5000,
                slowdown: 0,
                includedforrecording: true,
                name: action.payload.name,
                ip: action.payload.ip,
                shot: false
            })


            return {
                ...state,
                config: newConfigFinalAdd,
            }
        case "SET_CONFIG":

            let newConfig = {}

            state.config.forEach(element => {
                if (element.ip === action.payload.ip) {

                    newConfig.fps = action.payload.fps
                    newConfig.slowdown = action.payload.slowdown
                    newConfig.name = action.payload.name
                    newConfig.length = action.payload.length
                    newConfig.includedforrecording = action.payload.includedforrecording
                    newConfig.ip = action.payload.ip
                    newConfig.shot = action.payload.shot
                }
            });

            let indexValue = state.config.findIndex(x => x.ip === action.payload.ip)

            let newConfigFinal = state.config;
            newConfigFinal[indexValue] = newConfig;

            return {
                ...state,
                config: newConfigFinal
            }
        case "SET_VIDEOS":
            return {
                ...state,
                videos: action.payload
            }
        default:
            return state;
    }
}
