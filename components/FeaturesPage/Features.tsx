// @ts-nocheck

import FeaturesForm from './FeaturesForm';
import FeaturesList from './FeaturesList';

export default async function Features() {



    return (
        <div className="flex min-h-0 w-full flex-1 flex-col items-center overflow-y-scroll pt-8">
            <div className="w-full max-w-7xl lg:flex">

                <FeaturesForm />
                <FeaturesList />
            </div>
        </div>

    );
}
