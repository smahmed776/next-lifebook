import useSWR from "swr";
import API from "../API/API";

export function useApi(obj) {
  if (obj.method === "GET") {
    if (obj.auth && obj.revalidate) {
      const fetcher = async () => {
        const res = await API.get(obj.url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${obj.auth}`
          }
        });
        return res.data;
      };
      const { data, error } = useSWR(obj.text, fetcher, obj.revalidate);

      return {
        data,
        isLoading: !error && !data,
        isError: error
      };
    } else {
      if(obj.revalidate) {

        const fetcher = async () => {
          const res = await API.get(obj.url, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          return res.data;
        };
        const { data, error } = useSWR(obj.text, fetcher, obj.revalidate);
      }
      const fetcher = async () => {
        const res = await API.get(obj.url, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        return res.data;
      };
      const { data, error } = useSWR(obj.text, fetcher);

      return {
        data,
        isLoading: !error && !data,
        isError: error
      };
    }
  } else if (obj.method === "POST") {
    if (obj.auth) {
      const fetcher = async () => {
        const res = await API.get(obj.url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${obj.auth}`
          }
        });
        return res.data;
      };
      const { data, error } = useSWR(obj.text, fetcher);

      return {
        data,
        isLoading: !error && !data,
        isError: error
      };
    } else {
      const fetcher = async () => {
        const res = await API.post(obj.url, obj.data, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        return res.data;
      };
      const { data, error } = useSWR(obj.text, fetcher);

      return {
        data,
        isLoading: !error && !data,
        isError: error
      };
    }

  } else if (obj.method === "DELETE") {
    const fetcher = async () => {
      const res = await API.delete(obj.url, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return res.data;
    };
    const { data, error } = useSWR(obj.text, fetcher);

    return {
      data,
      isLoading: !error && !data,
      isError: error
    };
  } else if (obj.method === "PUT") {
  }
}


// export function useValidate(obj){
//   if (obj.method === "GET") {
//     if (obj.revalidate) {
//       const fetcher = async () => {
//         const res = await API.get(obj.url, {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         return res.data;
//       };
//       const { data, error } = useSWR(obj.key, fetcher, obj.revalidate);

//       return {
//         data,
//         isLoading: !error && !data,
//         isError: error
//       };
//     } else {
//       const fetcher = async () => {
//         const res = await API.get(obj.url, {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         return res.data;
//       };
//       const { data, error } = useSWR(obj.key, fetcher);

//       return {
//         data,
//         isLoading: !error && !data,
//         isError: error
//       };
//     }
//   } else if (method === "POST") {
//   } else if (method === "DELETE") {
//     const fetcher = async () => {
//       const res = await API.delete(url, {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       return res.data;
//     };
//     const { data, error } = useSWR(obj.text, fetcher);

//     return {
//       data,
//       isLoading: !error && !data,
//       isError: error
//     };
//   } else if (method === "PUT") {
//   }
// }


export async function fetchPost(obj){
  try {
    const res = await API.post(obj.url, obj.data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return {
      data: res.data
    }
  } catch (error) {
    return {
      isError: true,
      error: error.response
    }
  }
}