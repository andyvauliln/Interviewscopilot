import {
  createNextRouteHandler,
  createUploadthing,
  type FileRouter
} from 'uploadthing/next';

const f = createUploadthing();

const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '6MB', maxFileCount: 3 } })
    .middleware(async (req) => {
      console.log(req, '*********************IMAGE*****************');
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(
        metadata,
        file,
        '*********************IMAGE2*****************'
      );
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// Export routes for Next App Router

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter
});
