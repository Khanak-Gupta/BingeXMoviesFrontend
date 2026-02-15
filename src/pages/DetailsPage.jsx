import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import VideoPlay from '../components/VideoPlay'
import { useAuth } from '../context/AuthContext'

const DetailsPage = () => {

  const { user } = useAuth()
  const isLoggedIn = Boolean(user)
  const navigate = useNavigate()

  const params = useParams()
  const isMovie = params?.explore === "movie"
  const isTV = params?.explore === "tv"

  const imageURL = useSelector(state => state.movieoData.imageURL)

  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)

  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  const hours = data?.runtime ? Math.floor(data.runtime / 60) : 0
  const minutes = data?.runtime ? data.runtime % 60 : 0

  const episodeRuntime =
    data?.episode_run_time?.length > 0
      ? data?.episode_run_time[0]
      : null

  const director = castData?.crew?.find(el => el?.job === "Director")?.name

  const writer = castData?.crew
    ?.filter(el => el?.job === "Writer")
    ?.map(el => el?.name)
    ?.join(", ")

  const handlePlayVideo = (mediaData) => {

    if (!isLoggedIn) {
      navigate("/login", {
        state: { redirectTo: window.location.pathname }
      })
      return
    }

    setPlayVideoId(mediaData)
    setPlayVideo(true)
  }

  return (
    <div>

      <div className='w-full h-72 relative hidden lg:block'>
        <img
          src={imageURL + data?.backdrop_path}
          className='h-full w-full object-cover'
          alt='backdrop'
        />
        <div className='absolute w-full h-full top-0 bg-linear-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-6 lg:gap-10'>

        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            className='h-80 w-60 object-cover rounded shadow-lg'
            alt='poster'
          />

          <button
            onClick={() => handlePlayVideo(data)}
            className='mt-3 w-full py-2 px-4 bg-white text-black rounded font-bold text-lg hover:bg-linear-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>
            Watch Trailer
          </button>

          {isLoggedIn && (
            <button
              onClick={() => handlePlayVideo(data)}
              className='mt-3 w-full py-2 px-4 bg-red-600 text-white rounded font-bold text-lg hover:scale-105 transition-all'>
              Play Now
            </button>
          )}
        </div>

        <div className='flex-1'>

          <h2 className='text-2xl lg:text-4xl font-bold text-white'>
            {data?.title || data?.name}
          </h2>

          <p className='text-neutral-400 mb-2'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3 flex-wrap text-sm'>

            <p>⭐ {Number(data?.vote_average || 0).toFixed(1)}</p>
            <span>|</span>
            <p>👁 {Number(data?.vote_count || 0)}</p>
            <span>|</span>

            {isMovie && (
              <p>⏱ {hours}h {minutes}m</p>
            )}

            {isTV && (
              <>
                <p>📺 {data?.number_of_seasons || 0} Seasons</p>
                <span>|</span>
                <p>{data?.number_of_episodes || 0} Episodes</p>
                {episodeRuntime && (
                  <>
                    <span>|</span>
                    <p>{episodeRuntime} min / episode</p>
                  </>
                )}
              </>
            )}
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-2'>Overview</h3>
            <p className='text-neutral-300'>{data?.overview}</p>
          </div>

          <Divider />

          <div className='flex flex-wrap gap-3 text-sm'>

            <p>Status : {data?.status}</p>
            <span>|</span>

            <p>
              Release :
              {data?.release_date
                ? moment(data.release_date).format("MMMM Do YYYY")
                : data?.first_air_date
                  ? moment(data.first_air_date).format("MMMM Do YYYY")
                  : " N/A"}
            </p>

            {isMovie && (
              <>
                <span>|</span>
                <p>Revenue : ${Number(data?.revenue || 0).toLocaleString()}</p>
              </>
            )}
          </div>

          <Divider />

          <h2 className='font-bold text-lg'>Cast</h2>

          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
            {
              castData?.cast
                ?.filter(el => el?.profile_path)
                ?.slice(0, 12)
                ?.map((starCast) => (
                  <div key={starCast?.id}>
                    <img
                      src={imageURL + starCast?.profile_path}
                      className='w-24 h-24 object-cover rounded-full'
                      alt='cast'
                    />
                    <p className='font-bold text-center text-xs text-neutral-400 mt-1'>
                      {starCast?.name}
                    </p>
                  </div>
                ))
            }
          </div>

        </div>
      </div>

      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />
      </div>

      {
        playVideo && (
          <VideoPlay
            data={playVideoId}
            close={() => setPlayVideo(false)}
            media_type={params?.explore}
          />
        )
      }

    </div>
  )
}

export default DetailsPage
