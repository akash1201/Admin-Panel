import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist';
import RawTool from '@editorjs/raw';
import Embed from '@editorjs/embed';
import VideoTool from '@weekwood/editorjs-video';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
// import { usePreSignedUrlMutation } from 'services/profileApi';
import { useEffect, useRef, useState } from 'react';
// import { imageUploader } from "helpers/imageUploader";

const ContentInput = ({ editorJs, details = null }) => {
  //upload image
  //   const [
  //     preSignedUrl,
  //     {
  //       data: preSignedUrlData,
  //       isSuccess: preSignedUrlSuccess,
  //       isLoading: preSignedUrlLoading,
  //       error: preSignedUrlError,
  //     },
  //   ] = usePreSignedUrlMutation();

  const EDITOR_JS_TOOLS = {
    embed: {
      class: Embed,
      inlineToolbar: true,
      config: {
        services: {
          youtube: true,
          coub: true,
          vimeo: true,
          loom: {
            regex: /(?:https?:\/\/)?(?:www\.)?loom\.com\/(?:share\/)?(\w+)/,
            embedUrl: 'https://www.loom.com/embed/<%= remote_id %>',
            html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
          },
          codepen: {
            regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
            embedUrl:
              'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
            html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
            height: 300,
            width: 600,
            id: groups => groups.join('/embed/'),
          },
        },
      },
    },
    raw: RawTool,
    header: {
      class: Header,
      inlineToolbar: ['marker', 'inlineCode'],
      config: {
        placeholder: 'Enter a title',
        levels: [1, 2, 3, 4, 5, 6],
        level: 1,
      },
    },
    image: {
      class: Image,
      config: {
        endpoints: {
          // byUrl: `${process?.env?.NEXT_PUBLIC_BASE_URL}/community/v1/transport/fetch`,
        },
        //         uploader: {
        //           uploadByFile(file) {
        //             return imageUploader(file, preSignedUrl, 'post').then(res => {
        //               return {
        //                 success: 1,
        //                 file: {
        //                   url: `${process?.env?.NEXT_PUBLIC_BASE_IMG_URL}post/${file?.name}`,
        //                 },
        //               };
        //             });
        //           },
        //         },
      },
    },

    list: {
      class: List,
      inlineToolbar: true,
    },
    emptyBlock: {
      class: Delimiter,
      shortcut: 'CTRL+ENTER',
      config: {
        placeholder: ' ',
        class: 'empty-block',
      },
    },
    table: {
      class: Table,
      inlineToolbar: true,
      config: {
        rows: 2,
        cols: 3,
      },
    },
    warning: {
      class: Warning,
      inlineToolbar: true,
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C',
    },
    marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M',
    },
    raw: RawTool,
    embed: Embed,

    video: {
      class: VideoTool,
      config: {
        endpoints: {
          // byUrl: `${process?.env?.NEXT_PUBLIC_BASE_URL}/community/v1/transport/fetch`,
        },
        player: {
          controls: true,
          autoplay: false,
        },
        //         uploader: {
        //           uploadByFile(file) {
        //             return imageUploader(file, preSignedUrl, 'post').then(res => {
        //               return {
        //                 success: 1,
        //                 file: {
        //                   url: `${process?.env?.NEXT_PUBLIC_BASE_IMG_URL}post/${file?.name}`,
        //                 },
        //               };
        //             });
        //           },
        //         },
      },
    },
  };

  const divRef = useRef(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready && details) {
      editorJs?.current?.render(details?.description);
    }
  }, [ready, details]);

  useEffect(() => {
    editorJs.current = new EditorJs({
      holder: 'editor-js-body',
      tools: EDITOR_JS_TOOLS,
      placeholder: 'Write from here....',
      onReady: () => {
        setReady(true);
      },
    });

    return () => {
      editorJs.current.destroy();
    };
  }, []);

  return (
    <>
      <div ref={divRef} id="editor-js-body" />
    </>
  );
};

export default ContentInput;
