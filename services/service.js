import TrackPlayer, { 
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    Event 
} from 'react-native-track-player';

export async function setupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      isSetup = true;
    }
    catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
        ],
        progressUpdateEventInterval: 2,
      });
  
      isSetup = true;
    }
    finally {
      return isSetup;
    }
}

export async function addTracks(props) {
    console.log("PROPS: ", props);
    await TrackPlayer.add([
      {
        id: props.team.hashProgram,
        url: props.playlist,
        title: `${props.team.team} com`,
        artist: `O programa ${props.team.program}`,
        //description: props.team.description,
        artwork: `https://redeblast.com/super/uploads/team/${props.team.image}`
      }
    ]);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const PlaybackService = async function() {
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
        props.playPause(!props.paused);
    });
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
        props.playPause(!props.paused);
    });
    TrackPlayer.addEventListener(Event.RemoteStop, () => {
      TrackPlayer.destroy();
    });
};