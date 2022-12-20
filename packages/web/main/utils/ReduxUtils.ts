// TODO: abstract logic for initializing/destroying slice listeners into a parent class

export class ReduxUtils {
	/** Initializes any redux data stores that require initialization */
	public static initializeStores = async () => {
		(await this.getResponsiveUtils()).startDataStoreListeners();
	}

	/** Destroys any redux stores that required initialization */
	public static destroyStores = () => {
		this.getResponsiveUtils().then(utils => utils.destoryStoreListeners());
	}

    /** Dynamically imports ResponsiveUtils to avoid referencing `window` api on server */
    public static getResponsiveUtils = async () => {
        const { ResponsiveUtils } = await import("@/Features/responsive/Responsive");

        return ResponsiveUtils;
    }
}