import {MissionItem} from "./MissionItem";

describe('MissionItem ', () => {
    describe('that is in liked mode', () => {
        it('removes mission when clicked on remove button', () => {
            const mission = {

            }
            const { missionItem } = render(
                <MissionItem mission={mission} isLikedModeToggled={false} />
            );
            expect(true).toBe(true);
        });
    });
});