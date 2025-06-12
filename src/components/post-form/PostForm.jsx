import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import RTE from '../RTE';
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import appwriteService from '../../appwrite/config'
import { useNavigate  } from 'react-router';
import { useSelector } from 'react-redux';

function PostForm({post}) {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData.userData);
    
    const {register, handleSubmit, watch, setValue, control, getValues}  = useForm({
        defaultValues: {
            title: post ? post.title : "",
            slug: post ? post.slug : "",
            content: post ? post.content : "",
            status: post ? post.status : "active",
        }
    })

    const submit = async (data) => {
      console.log(data)
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file){
                await appwriteService.deleteFile(post.fetauredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {...data, featuredImage: file ? file.$id : undefined})
            
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        } 
        else{
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : undefined

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                data.userId = userData.$id;
                const dbPost = await appwriteService.createPost({
                    // ...data,
                    // userId: userData.$id
                    ...data
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }

    const slugTransform = (value) => {
      if (value && typeof value === "string") {
        return value
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with '-'
          .replace(/^-+|-+$/g, ""); // remove leading/trailing hyphens
      }
      return "";
    };

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full hover:bg-blue-700 "
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    );
}

export default PostForm