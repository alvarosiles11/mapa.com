import Parent from './index'

type DataProps = {
    component: any,
    type: string,
    version?: any,
    estado?: "exito" | "cargando" | "error",
    error: any,
    [key: string]: any;
}

const initialState = () => {
    return {
        component: Parent.component,
        version: Parent.version,
    };
}
const General = (state: any, action: DataProps) => {
    if (action.component != "general") return state;
    if (action.estado != "exito") return state;
    if (!action.components.includes(Parent.component)) return state;
    switch (action.type) {
        case "getAllComponents":
            state.data = action.data[Parent.component];
            break;
    }
    state = { ...state };
    return state;
}

export default (state: any, action: DataProps) => {
    if (!state) return initialState();
    if (action.component != Parent.component) return General(state, action);
    // if (action.version != Parent.version) return state;
    TypesSwitch(state, action)
    state.type = action.type;
    state.estado = action.estado;
    state.error = action.error;
    state.lastSend = new Date();
    state = { ...state };
    return state;
}

const TypesSwitch = (state: any, action: DataProps) => {
    switch (action.type) {
        case "getAll": return getAll(state, action);
        case "registro": return registro(state, action);
        case "editar": return editar(state, action);
        case "getById": return getById(state, action);
    }
}

const getAll = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.data = action.data;
}
const registro = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.lastRegister = action.data;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const editar = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const getById = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.data[action.data.key] = action.data;
}