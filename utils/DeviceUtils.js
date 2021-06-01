import NetInfo from "@react-native-community/netinfo";

export async function isConnected () {
    const netInfo = await NetInfo.fetch();
    
    return netInfo.isConnected;
}

export default {
    isConnected,
};
