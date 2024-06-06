import React, { useState } from 'react'
import Table from '../../ui/Table'
import truncateText from '../../utils/truncateText'
import { toPersianNumbersWithComma } from '../../utils/toPersianNumbers'
import toLocalDateShort from '../../utils/toLocalDateShort'
import { HiOutlineTrash } from 'react-icons/hi'
import { TbPencilMinus } from 'react-icons/tb'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import useRemoveProject from './useRemoveProject'

function ProjectRow({ project, index }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const {isDeleting,removeProject}=useRemoveProject();
    return (
        <Table.Row >
            <td> {index + 1}</td>
            <td> {truncateText(project.title, 30)}</td>
            <td> {project.category.title}</td>
            <td> {toPersianNumbersWithComma(project.budget)}</td>
            <td> {toLocalDateShort(project.deadline)}</td>
            <td>
                <div className='flex flex-wrap items-center gap-2 max-w-[200px]'>
                    {project.tags.map((tag) => (
                        <span className='badge badge--secondary'
                            key={tag._id}>{tag.title}</span>
                    ))}
                </div>
            </td>
            <td>{project.freelancer?.name || "-"}</td>
            <td>
                {project.status === "OPEN" ? (
                    <span className='badge badge--success'>باز</span>
                ) : (<span className='badge badge--danger' >بسته</span>)}
            </td>
            <td>
                <div className='flex items-center gap-x-4'>
                  {/* //edit */}
                    <>
                        <button onClick={() => setIsEditOpen(false)}>
                            <TbPencilMinus className='w-5 h-5 text-primary-900' />
                        </button>
                        <Modal
                            title={` ویرایش ${project.title}`}
                            open={isEditOpen}
                            onClose={() => setIsEditOpen(false)}
                        >
                            this is modal...
                        </Modal>
                    </>

                    {/* //delete */}
                    <>
                        <button onClick={() => setIsDeleteOpen(true)}>
                            <HiOutlineTrash className='w-5 h-5 text-error' />
                        </button>
                        <Modal
                            title={` حذف ${project.title}`}
                            open={isDeleteOpen}
                            onClose={() => setIsDeleteOpen(false)}
                        >
                            <ConfirmDelete 
                            resourceName={project.title} 
                            onClose={()=>setIsDeleteOpen(false)}
                            onConfirm={()=>removeProject(project._id,{
                                onSuccess:()=>setIsDeleteOpen(false),
                            })}
                    
                            disabled={false} />
                        </Modal>
                    </>
                </div>
            </td>
        </Table.Row>)
}

export default ProjectRow