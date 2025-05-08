
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project } from "@/types/project";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddEditProjectDialogProps {
  project?: Project;
  onSave: (project: Project) => void;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
}

const AddEditProjectDialog = ({ 
  project, 
  onSave, 
  onDelete, 
  isAdmin = false 
}: AddEditProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Project>(
    project || {
      id: Date.now(),
      title: "",
      description: "",
      image: "/placeholder.svg",
      tags: [],
      category: "other",
      fullDescription: "",
      gallery: ["/placeholder.svg"]
    }
  );
  
  const [tagInput, setTagInput] = useState("");
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value as Project["category"]
    });
  };

  const handleAddTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput]
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: [...(formData.gallery || []), "/placeholder.svg"]
    });
  };

  const handleUpdateGalleryImage = (index: number, value: string) => {
    const updatedGallery = [...(formData.gallery || [])];
    updatedGallery[index] = value;
    setFormData({
      ...formData,
      gallery: updatedGallery
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: (formData.gallery || []).filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    onSave(formData);
    setOpen(false);
    
    toast({
      title: `Project ${project ? "updated" : "added"}`,
      description: `"${formData.title}" has been ${project ? "updated" : "added"} successfully.`,
    });
  };

  const handleDelete = () => {
    if (onDelete && project) {
      onDelete(project.id);
      setOpen(false);
      toast({
        title: "Project deleted",
        description: `"${project.title}" has been removed.`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {project ? (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs"
            disabled={!isAdmin}
          >
            <Edit className="h-3 w-3" /> Edit
          </Button>
        ) : (
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Add New Work
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="image" className="text-right">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="col-span-3"
              placeholder="/placeholder.svg"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="category" className="text-right">Category</Label>
            <div className="col-span-3">
              <Select 
                value={formData.category} 
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logo">Logo Design</SelectItem>
                  <SelectItem value="wedding">Wedding Cards</SelectItem>
                  <SelectItem value="printing">Printing & Banners</SelectItem>
                  <SelectItem value="web">Web Design</SelectItem>
                  <SelectItem value="app">App Design</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-2">
            <Label htmlFor="description" className="text-right mt-2">Short Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-2">
            <Label htmlFor="fullDescription" className="text-right mt-2">Full Description</Label>
            <Textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription || ""}
              onChange={handleChange}
              className="col-span-3"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-2">
            <Label className="text-right mt-2">Tags</Label>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <div 
                    key={index} 
                    className="bg-accent/30 text-accent-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1"
                  >
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="text-accent-foreground/70 hover:text-accent-foreground"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} variant="secondary" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-2">
            <Label className="text-right mt-2">Gallery Images</Label>
            <div className="col-span-3 space-y-2">
              {formData.gallery && formData.gallery.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => handleUpdateGalleryImage(index, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Button type="button" onClick={() => handleRemoveGalleryImage(index)} variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                onClick={handleAddGalleryImage} 
                variant="outline"
                size="sm"
                className="w-full mt-2"
              >
                Add Gallery Image
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          {project && onDelete && (
            <Button variant="destructive" onClick={handleDelete} type="button">
              Delete Project
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} type="button">Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProjectDialog;
